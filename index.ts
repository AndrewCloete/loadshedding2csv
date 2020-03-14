import { LoadsheddingStage, Status, LoadsheddingSchedule, Schedule, Search, Province, Municipality, Suburb } from 'eskom-loadshedding-api';
import moment from 'moment';

async function printStatus() {
    let status: LoadsheddingStage = await Status.getStatus()
    console.log('Current status: ', status)
} 

// Run this function to find your suburb ID
async function search() {
    // Search municipalities
    let municipalities: Municipality[] = await Search.getMunicipalities(Province.WESTERN_CAPE)
    console.log(municipalities)

    // Search suburb within municipality
    let suburbs: Suburb[] = await Search.getMunicipalitySuburbs(10257, 'Lyn')
    console.log(suburbs)
}


async function generateCSV(alias: string, stage: LoadsheddingStage,subID: number, tzm: number) {
    
    let sched: LoadsheddingSchedule = await Schedule.getSchedule(subID, stage)

    // Flatten the schedule
    let slotsUTC = sched.schedule.map(s => s.times).reduce((acc, val) => acc.concat(val), [])

    // Serialize to CSV
    console.log("Subject,StartDate,StartTime,EndDate,EndTime,AllDayEvent,Location,Description")
    for (let s of slotsUTC) {
        let start = moment(s.startTime).utcOffset(tzm)
        let end = moment(s.endTime).utcOffset(tzm)
        console.log(`Stage ${stage},${start.format("MM/DD/YY")},${start.format("HH:mm")},${end.format("MM/DD/YY")},${end.format("HH:mm")},FALSE, ${alias} stage ${stage},loadshedding`)
    }
}



// ===== main =====
const ALIAS = 'Home'
const SUBURB_ID = 1061733 // ... get the suburb ID by running the search function
const TZ_OFFSET_MINUTES = 120

if (process.argv.length != 3) {
    console.log("Usage:\n\tnode dist/index.js 2 > /tmp/stage2.csv")
}

const STAGE = parseInt(process.argv[2])
if (!STAGE) {
    console.log(`${process.argv[2]} is an invalid stage`)
}

generateCSV(ALIAS, STAGE, SUBURB_ID, TZ_OFFSET_MINUTES)
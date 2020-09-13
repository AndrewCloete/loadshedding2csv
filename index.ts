import { LoadsheddingStage, Status, LoadsheddingSchedule, Schedule, Search, Province, Municipality, Suburb } from 'eskom-loadshedding-api';
import moment from 'moment';

require('tls').DEFAULT_MIN_VERSION = 'TLSv1'

async function printStatus() {
    let status: LoadsheddingStage = await Status.getStatus()
    console.log('Current status: ', status)
}

async function searchMunicipalities(province: Province) {
    // Search municipalities in province
    let municipalities: Municipality[] = await Search.getMunicipalities(province)
    console.log(municipalities)
}
async function searchSuburb(municipalityID: number, searchString: string) {
    // Search suburb within municipality
    let suburbs: Suburb[] = await Search.getMunicipalitySuburbs(municipalityID, searchString)
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


// ===== search =====
// searchMunicipalities(Province.WESTERN_CAPE).then(() => process.exit(0))
// searchSuburb(144, 'Donker').then(() => process.exit(0))
// searchSuburb(356, 'Lyn').then(() => process.exit(0))


// ===== main =====
const ALIAS = 'Lyndoch'
const SUBURB_ID = 67585 // ... get the suburb ID by running the search function
const TZ_OFFSET_MINUTES = 120

if (process.argv.length != 3) {
    console.log("Usage:\n\tnode dist/index.js 2 > /tmp/stage2.csv")
}

const STAGE = parseInt(process.argv[2])
if (!STAGE) {
    console.log(`${process.argv[2]} is an invalid stage`)
}

generateCSV(ALIAS, STAGE, SUBURB_ID, TZ_OFFSET_MINUTES).then(() => process.exit(0))


/* REF
const ALIAS = 'Gariep'
const SUBURB_ID = 11797

const ALIAS = 'Lyndoch'
const SUBURB_ID = 1061733

*/
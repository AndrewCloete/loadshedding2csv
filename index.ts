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


async function generateCSV(stage: LoadsheddingStage,subID: number, tzm: number, daylimit: number) {
    
    let sched: LoadsheddingSchedule = await Schedule.getSchedule(subID, stage)
    let limitedShed = sched.schedule.slice(daylimit - 1)

    // Flatten the schedule
    let slotsUTC = limitedShed.map(s => s.times).reduce((acc, val) => acc.concat(val), [])

    console.log("Subject,StartDate,StartTime,EndDate,EndTime,AllDayEvent,Location,Description")
    for (let s of slotsUTC) {
        let start = moment(s.startTime).utcOffset(tzm)
        let end = moment(s.endTime).utcOffset(tzm)
        console.log(`${stage},${start.format("MM/DD/YY")},${start.format("HH:mm")},${end.format("MM/DD/YY")},${end.format("HH:mm")},FALSE,,loadshedding`)
    }


}

const STAGE = LoadsheddingStage.STAGE_2
const SUBURB_ID = 1061733 // ... get the suburb ID by running the search function
const TZ_OFFSET_MINUTES = 120
const DAY_LIMIT = 2

generateCSV(STAGE, SUBURB_ID, TZ_OFFSET_MINUTES, DAY_LIMIT)
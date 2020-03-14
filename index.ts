import { LoadsheddingStage, Status, LoadsheddingSchedule, Schedule, Search, Province, Municipality, Suburb } from 'eskom-loadshedding-api';
 
Status.getStatus().then((status: LoadsheddingStage) => console.log('Current status: ', status));

// Search.getMunicipalities(Province.WESTERN_CAPE).then((municipalities: Municipality[]) =>
//     console.log('Western Cape municipalities:', municipalities.map((el: Municipality) => el))
// );

Search.getMunicipalitySuburbs(10257 /* Stellenbosch's id */, 'Lyn' /* Search term */).then((suburbs: Suburb[]) =>
    console.log('Filterd suburbs in Stellenbosch:', suburbs)
);
Schedule.getSchedule(1061733, LoadsheddingStage.STAGE_1).then((schedule: LoadsheddingSchedule) => console.log(JSON.stringify(schedule, null, 4)));
 
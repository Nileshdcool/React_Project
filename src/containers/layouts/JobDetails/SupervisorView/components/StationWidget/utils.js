import isEmpty from 'lodash/isEmpty';

export const generateWidgetMaterialsCheckboxes = (lineJobStations, stationName, setStationsBoms) => {
  const isStationHasDraws = lineJobStations.some(item =>
    item.name === stationName && !isEmpty(item.lineJobStationsDrawingsList));

  const isStationHasDocs = lineJobStations.some(item =>
    item.name === stationName && !isEmpty(item.lineJobStationsDocumentsList));

  const isStationHasTasks = lineJobStations.some(item =>
    item.name === stationName && !isEmpty(item.lineJobStationsTasksList));

  const isStationHasUnitChecks = lineJobStations.some(item =>
    item.name === stationName && item.isStationHasUnitChecks);

  const isStationHasVDRs = lineJobStations.some(item =>
    item.name === stationName && item.isStationHasVDRs);

  const isStationHasITPs = lineJobStations.some(item =>
    item.name === stationName && item.isStationHasITPs);

  const stationId = lineJobStations.find(item => item.name === stationName).id;
  const bomsStationsIDs = setStationsBoms.map(bom => bom.lineJobStationId);

  const isStationHasBOMs = bomsStationsIDs.includes(stationId);

  return {
    draws: isStationHasDraws,
    docs: isStationHasDocs,
    tasks: isStationHasTasks,
    boms: isStationHasBOMs,
    unitChecks: isStationHasUnitChecks,
    vdrs: isStationHasVDRs,
    itps: isStationHasITPs,
  };
};

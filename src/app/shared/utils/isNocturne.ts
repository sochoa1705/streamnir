import * as moment from 'moment';

export const  isHourNocturne=(fechaISO:any) =>{
  const horaNocturnaInicio = moment().set({ hour: 19, minute: 0, second: 0, millisecond: 0 });
  const horaNocturnaFin = moment().add(1, 'day').set({ hour: 5, minute: 0, second: 0, millisecond: 0 });

  const fechaVerificar = moment(fechaISO);

  if (horaNocturnaFin.isBefore(horaNocturnaInicio)) {
    // Si la hora nocturna cruza la medianoche
    return fechaVerificar.isSameOrAfter(horaNocturnaInicio) || fechaVerificar.isSameOrBefore(horaNocturnaFin);
  } else {
    // Si la hora nocturna no cruza la medianoche
    return fechaVerificar.isSameOrAfter(horaNocturnaInicio) && fechaVerificar.isSameOrBefore(horaNocturnaFin);
  }
}



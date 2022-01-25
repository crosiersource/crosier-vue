/* eslint-disable */
// moment.js locale configuration
// locale : brazilian portuguese (pt-br)
// author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['moment'], factory); // AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(require('../moment')); // Node
  } else {
    factory(window.moment); // Browser global
  }
}(function (moment) {
  return moment.defineLocale('pt-br', {
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril', 
      'Maio', 
      'Junho', 
      'Julho', 
      'Agosto', 
      'Setembro', 
      'Outubro', 
      'Novembro', 
      'Dezembro',
    ],
    monthsShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr', 
      'Mai', 
      'Jun', 
      'Jul', 
      'Ago', 
      'Set', 
      'Out', 
      'Nov', 
      'Dez',
    ],
    weekdays: [
      'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
    ],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb',],
    weekdaysMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb',],
    longDateFormat: {
      LT: 'HH:mm',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY [às] LT',
      LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT'
    },
    calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: function () {
        return (this.day() === 0 || this.day() === 6) ?
          '[Último] dddd [às] LT' : // Saturday + Sunday
          '[Última] dddd [às] LT'; // Monday - Friday
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'em %s',
      past: '%s atrás',
      s: 'segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos'
    },
    ordinal: '%dº'
  });
}));
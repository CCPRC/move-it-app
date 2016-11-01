module.exports = function () {
  var option = {
    ethnicities: ['American Indian / Alaska Native', 'Asian American', 'Black / African American', 'East Asian', 'Hispanic / Latino', 'Native Hawaiian & Other, Pacific Islander', 'South Asian', 'Southwest Asian', 'White', 'Other'],
    hospitals: ['Roper', 'MUSC'],
    heights: ["4' 0''", "4' 1''", "4' 2''", "4' 3''", "4' 4''", "4' 5''", "4' 6''", "4' 7''", "4' 8''", "4' 9''", "4' 10''", "4' 11''", "5' 0''", "5' 1''", "5' 2''", "5' 3''", "5' 4''", "5' 5''", "5' 6''", "5' 7''", "5' 8''", "5' 9''", "5' 10''", "5' 11''", "6' 0''", "6' 1''", "6' 2''", "6' 3''", "6' 4''", "6' 5''", "6' 6''", "6' 7''", "6' 8''", "6' 9''", "6' 10''", "6' 110''", "7' 0''"],
    physicalDates: ['1 - 6 months', '7 - 12 months', '3 - 4 months', '5 or more'],
    statuses: ['1', '2', '3'],
    periods: ['AM', 'PM'],
    sources: ['source 1', 'source 2', 'source 3'],
    states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    repeats: ['once', 'often', 'all the time'],
    durations: ['15 min', '30 min', '45 min', '1hr', '1hr 30min', '2hr', '2hr 30min', '3hr'],
    hours: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5],
    categories: ['Class', 'Program', 'Event', 'Drop In'],
    minutes: [],
    ages: [],
    days: [],
    years: [],
    status: [{type:'Inactive', color: 'red'}, {type:'Pending', color: 'yellow'}, {type:'Pending Baseline', color: 'orange'}, {type:'Dropped', color: 'grey'}, {type:'Inactive', color: 'blue'}]
  }
  function createMin () {
    for (var i = 0; i < 10; i++) {
      var underTen = '0' + i
      option.minutes.push(underTen)
    }
    for (var j = 10; j < 60; j++) {
      option.minutes.push(j)
    }
  }
  function generateAges () {
    for (var i = 0; i < 101; i++) {
      option.ages.push(i)
    }
  }
  function generateDays () {
    for (var i = 0; i < 32; i++) {
      option.days.push(i)
    }
  }
  function generateYears () {
    var thisYear = new Date().getFullYear()
    var startDate = thisYear - 100
    for (var i = startDate; i <= thisYear; i++) {
      option.years.push(i)
    }
  }
  createMin ()
  generateAges()
  generateDays()
  generateYears()
  return {
    get: get
  }
  function get(key) {
    return option[key]
  }
}

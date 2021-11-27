import mpg_data from "./data/mpg_data.js";
import {getStatistics, getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: mpg_data.reduce(function (previousValue, currentValue) {
        return previousValue + (currentValue.city_mpg + currentValue.highway_mpg)/2
    }, 0) / mpg_data.length,
    allYearStats: getStatistics(mpg_data.map(element => element.year)),
    ratioHybrids: mpg_data.reduce(function (previousValue, currentValue){
        return currentValue.hybrid ? previousValue + 1 : previousValue;
    }, 0) / mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

 export const moreStats = {
    makerHybrids: mpg_data.reduce(function (previousValue, currentValue) {
        if (currentValue.hybrid) {
            previousValue.some(obj => obj.make === currentValue.make) ? previousValue.find(obj => obj.make === currentValue.make).hybrids.push(currentValue.id) : previousValue.push({"make": currentValue.make, "hybrids": [currentValue.id]});
        }
        return previousValue;
    }, []).sort((first, second) => first.hybrids.length < second.hybrids.length ? 1 : -1),
    avgMpgByYearAndHybrid: Object.assign({}, mpg_data.reduce(function (obj, car) {
        if(car.hybrid) {
            if(car.year in obj) {
                obj[car.year].hybrid.city.push(car.city_mpg);
                obj[car.year].hybrid.highway.push(car.highway_mpg);
            } else {
                obj[car.year] = {"hybrid": {"city": [car.city_mpg], "highway": [car.highway_mpg]}, "notHybrid": {"city": [], "highway": []}}
            }
        } else {
            if(car.year in obj) {
                obj[car.year].notHybrid.city.push(car.city_mpg);
                obj[car.year].notHybrid.highway.push(car.highway_mpg);
            } else {
                obj[car.year] = {"hybrid": {"city": [], "highway": []}, "notHybrid": {"city": [car.city_mpg], "highway": [car.highway_mpg]}}
            }
        }
        return obj;
    }, []).map(function (element) {
        element.hybrid.city = getSum(element.hybrid.city) / element.hybrid.city.length;
        element.hybrid.highway = getSum(element.hybrid.highway) / element.hybrid.highway.length;
        element.notHybrid.city = getSum(element.notHybrid.city) / element.notHybrid.city.length;
        element.notHybrid.highway = getSum(element.notHybrid.highway) / element.notHybrid.highway.length;
        return element;
    }))
};

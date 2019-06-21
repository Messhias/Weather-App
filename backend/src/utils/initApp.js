import Axios from "axios";
import Weather from "../request/Weather/GetDefaultData";

const { Client } = require('pg');
const clientConstructor = new Client({
    host: "ec2-23-21-186-85.compute-1.amazonaws.com",
    database: "dfp4d40glbpd2f",
    password: "435c87d3d3c6eeca55c10d3914f3a514f867eac38ba5fb3830fe180fc1e20c2d",
    user: "uscomshhpttkvk",
});
clientConstructor.connect();

/**
 * Here we'll initialize my default locations and insert into postgres database.
 *
 * @private
 */
export function  __construct() {
    let query = "INSERT INTO my_locations(city, country, is_default)\n" +
        "    SELECT 'Budapest', 'HU', 'true'\n" +
        "WHERE NOT EXISTS (\n" +
        "    SELECT 1 FROM my_locations WHERE city='Budapest' and country = 'HU'\n" +
        ");";
    clientConstructor.query(query)
        .catch(e => console.error(e.stack));

    query = "INSERT INTO my_locations(city, country)\n" +
        "    SELECT 'Berlin', 'DE'\n" +
        "WHERE NOT EXISTS (\n" +
        "    SELECT 1 FROM my_locations WHERE city='Berlin' and country = 'DE'\n" +
        ");";
    clientConstructor.query(query)
        .catch(e => console.error(e.stack));

    fillCountriesList();
    fillLocationData();
}

/**
 * At the initialization of the application we fill the countries list in data.
 *
 * Before fill the countries in the database we check if the data which comes from api is different of
 * our actual data, if it's update it adding the new countries.
 */
function fillCountriesList() {
    Axios("https://restcountries.eu/rest/v2/all")
        .then(response => {
            const { status = 500 } = response;
            if (status === 200) {
                const { data = [] } = response;
                if (data.length > 0) {
                    data.forEach(d => {
                        const check = "select * from countries_list where country = $1 and capital = $2";
                        const values = [`${d.name}`, `${d.capital}`];
                        clientConstructor.query(check, values).
                            then(result => {
                                if (result.rows.length === 0) {
                                    const insert = "insert into countries_list (country, capital, info) values ($1, $2, $3)";
                                    const values = [`${d.name}`, `${d.capital}`,`${JSON.stringify(d)}`];
                                    clientConstructor.query(insert, values);
                                }
                            })
                            .catch(error => console.error(error));
                    });
                }
            }
        })
        .catch(error => console.error(error));
}

/**
 * Fill my locations data in database or update it.
 */
export function fillLocationData() {
    let query = "select * from my_locations";
    clientConstructor.query(query, [], (error, res) => {
        if (res.rows.length > 0) {
            res.rows.forEach(r => {
                Weather({city: r.city, country: r.country})
                    .then(res => {
                        const { data = [] } = res;
                        query = "select * from locations_data where city = $1 and country = $2";
                        clientConstructor.query(query, [`${r.city}`, `${r.country}`])
                            .then(response => {
                                const { rows = [] } = response;

                                if (rows.length === 0) {
                                    query = "insert into locations_data (city, country, info) " +
                                        " values ($1, $2, $3)";
                                    clientConstructor.query(query, [
                                        `${r.city}`,
                                        `${r.country}`,
                                        `${JSON.stringify(data)}`
                                    ]);
                                } else {
                                    query = "update locations_data set info = $1 where country=$2 and city=$3";
                                    clientConstructor.query(query, [
                                        `${JSON.stringify(data)}`,
                                        `${r.country}`,
                                        `${r.city}`
                                    ]);
                                }
                            })
                    })
                    .catch(error => console.error(error));
            });
        }
    })
}
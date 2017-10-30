/*

Lab - Using $lookup

Which alliance from air_alliances flies the most routes with either a Boeing 747 or an Airbus A380 (abbreviated 747 and 380 in air_routes)?
*/

var pipeline = [
    {
        $match: {
            $or: [{ airplane: /380/ }, { airplane: /747/ }]
        }
    },
    {
        $group: {
            _id: '$airline.name',
            routes: { $sum: 1 }
        }
    },
    {
        $sort: {
            routes: -1
        }
    },
    { $limit: 1 }
]
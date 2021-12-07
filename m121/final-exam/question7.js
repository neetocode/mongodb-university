

var pipeline = [
    {
        $match: {
           $and: [
                { src_airport: { $in: ["JFK", "LHR"] } },
                { dst_airport: { $in: ["JFK", "LHR"] } },
            ],
        }
    },
    {
        $lookup: {
            from: 'air_alliances',
            localField: 'airline.name',
            foreignField: 'airlines',
            as: 'alliance'
        }
    },
    {
        $group: {
            _id: '$alliance.name',
            sum: { $sum: 1 }
        }
    }
]

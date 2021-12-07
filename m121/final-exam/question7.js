

var pipeline = [
    {
        $match: {
            $and: [
                { src_airport: 'JFK' }, { dst_airport: 'LHR' }
            ],
            $and: [
                { src_airport: 'LHR' }, { dst_airport: 'JFK' }
            ]
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
      $match: { alliance: { $ne: [] } },
    },
    {
        $group: {
            _id: '$alliance.name',
            sum: { $sum: 1 }
        }
    }
]

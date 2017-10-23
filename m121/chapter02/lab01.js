// Lab: Using Cursor-like Stages

var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"]
var pipeline = [
    {
        $match: {
            'tomatoes.viewer.rating': { $gte: 3 },
            countries: 'USA'
        }
    },
    {
        $project: {
            _id: 0,
            'num_favs': {
                $size: {
                    $ifNull: [
                        {
                            $filter: {
                                input: "$cast",
                                as: "cast",
                                cond: { $in: ["$$cast", favorites] }
                            }
                        },
                        []
                    ]
                }
                ,
                // $reduce: {
                //     input: '$cast',
                //     initialValue: 0,
                //     in: {

                //     }
                // }
            },
            // cast: 1,
            title: 1,
            'rating': '$tomatoes.viewer.rating'
            // count: { $sum: '$_id' }
        }
    },
    { $sort: { 'num_favs': -1, 'rating': -1 } },
    { $limit: 25 }
]
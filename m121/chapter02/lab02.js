// Lab - Bringing it all together


// general scaling
// min + (max - min) * ((x - x_min) / (x_max - x_min))

// we will use 1 as the minimum value and 10 as the maximum value for scaling,
// so all scaled votes will fall into the range [1,10]

// scaled_votes = 1 + 9 * ((x - x_min) / (x_max - x_min))

// NOTE: We CANNOT simply do 10 * ((x - x_min))..., results will be wrong
// Order of operations is important!

// use these values for scaling imdb.votes
x_max = 1521105
x_min = 5
min = 1
max = 10
// x = imdb.votes

// given we have the numbers, this is how to calculated normalized_rating
// normalized_rating = average(scaled_votes, viewerRating)

var pipeline = [
    {
        $match: {
            'imdb.rating': { $gte: 1 },
            // 'imdb.votes': { $gte: 1 },
            'released': { $gte: ISODate("1990-01-01") },
            languages: 'English'
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            normalized_rating: {
                $avg: [
                    {
                        $add: [
                            1,
                            {
                                $multiply: [
                                    9,
                                    {
                                        $divide: [
                                            { $subtract: ['$imdb.votes', x_min] },
                                            { $subtract: [x_max, x_min] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    '$imdb.rating'
                ]
            }
        }
    },
    {
        $sort: { 'normalized_rating': 1 }
    }
]
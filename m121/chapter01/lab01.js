// Lab - $match

var pipeline = [
    {
        $match: {
            'imdb.rating': { $gte: 7 },
            'genres': { $nin: ['Crime', 'Horror'] },
            'rated': { $in: ['PG', 'G'] },
            $and: [{ 'languages': 'English' }, { 'languages': 'Japanese' }]
        }
    },
    {
        $project: {
            title: 1,
            rated: '$imdb.rating',
            _id: 0
        }
    }
]
// Lab - Changing Document Shape with $project

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
            _id: 0,
            title: 1,
            rated: 1
        }
    },

]
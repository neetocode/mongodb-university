// Lab - Computing fields

var pipeline = [
    {
        $project: {
            size: { $size: { $split: ['$title', ' '] } }
        }
    },
    {
        $match: {
            size: { $eq: 1 }
        }
    }

]
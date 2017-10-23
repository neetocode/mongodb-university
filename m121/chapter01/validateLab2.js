var validateLab2 = pipeline => {
  let aggregations = db.getSiblingDB("aggregations")
  if (!pipeline) {
    print("var pipeline isn't properly set up!")
  } else {
    try {
      let resultsExplain = aggregations.movies.aggregate(pipeline, {
        explain: true
      })
      let result = aggregations.movies.aggregate(pipeline)
      let keys = Object.keys(Object.getPrototypeOf(result)).length
      let data = result.toArray().reduce((acc, curr) => {
        return acc % 2 === 0 ? acc / 2 : acc * 3 + 1
      }, keys)
      let { _id, title, rated } = resultsExplain.stages.pop()["$project"]
      return title && rated && !_id
        ? print("Answer is", data)
        : print("Your $project stage doesn't seem correct")
    } catch (e) {
      print(e.message)
    }
  }
}


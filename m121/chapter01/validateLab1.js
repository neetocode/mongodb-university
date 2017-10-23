let validateLab1 = pipeline => {
  let aggregations = db.getSiblingDB("aggregations")
  if (!pipeline) {
    print("var pipeline isn't properly set up!")
  } else {
    var studentSubmission = aggregations.movies.aggregate(pipeline)
    try {
      var keys = Object.keys(Object.getPrototypeOf(studentSubmission)).length
      var batchSize = studentSubmission._batch.length
      var totalReturned = studentSubmission.itcount()
      var data = studentSubmission
        .toArray()
        .reduce(
          (acc, curr) => acc + (curr.year * batchSize - curr.viewerVotes),
          totalReturned
        )
      if (totalReturned === 23) {
        print("Answer is", data % keys)
      } else {
        print("You aren't returning the correct number of documents")
      }
    } catch (e) {
      if (e instanceof TypeError && e.message.includes("batch is undefined")) {
        print("It doesn't appear you're using the aggregation framework")
      } else {
        print(e.message)
      }
    }
  }
}

//===============================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
//===============================================

var friendsData = require("../data/friends.js");

//=============================================== 
// Routing 
//===============================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the belowe cases when a user visits a link
    // (ex: localhost:PORT/api/admin..) they are shown a JSON of the data in the table
    //-------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });


    app.post("/api/friends", function(req, res) {
        // req.body is available since we're using the body-parser middleware.
            var arrayScores = req.body.scores
            var arrayCompare = []
            var totalScore = 0
            for (i = 0 ; i < friendsData.length ; i++ ) {
                
                for (j = 0 ; j < 10 ; j++) {
                   totalScore += Math.abs(friendsData[i].scores[j] - arrayScores[j])
                   console.log(totalScore)
                }
                arrayCompare.push(totalScore)
                totalScore = 0
                
            }
            var matchIndex = indexOfSmallest(arrayScores)
            console.log(arrayCompare)
            console.log(arrayScores)
            res.json(friendsData[indexOfSmallest(arrayCompare)]);
            //friendsData.push(req.body);
            console.log(matchIndex)
});

       
};

        function indexOfSmallest(a) {
            var lowest = 0;
            for (var i = 1; i < a.length; i++) {
            if (a[i] < a[lowest]) lowest = i;
            }
            return lowest;
        } 
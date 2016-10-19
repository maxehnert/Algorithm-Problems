/* similar to observer pattern */

var pubsub = {}

(function(myObject) {

  // Storage for topics which can be broadcast or listened to
  var topics = {}

  // topic identifier
  var subUid = -1

  /**
   * publish or broadcast events with a
   * specific topic name and args such as the
   * data you want to pass along
   */
   myObject.publish = function(topic, args) {
     if (!topics[topic]) {
       return false
     }

     var subscribers = topics[topic]
     var len = subscribers ? subscribers.length : 0

     while (len--) {
       subscribers[len].func(topic, args)
     }

     return this
   }

   /**
    * subscribe to events with a specific topic name
    * and a callback fn to be executed when the topic/event is observed
    */
    myObject.subscribe = function(topic, func) {
      if (!topics[topic]) {
        topics[topic] = []
      }

      var token = (++subUid).toString()

      topics[topic].push({
        token,
        func
      })

      return token
    }

    /**
     * unsubscribe from a specific topic based on tokenized ref to the sub
     */
     myObject.unsubscribe = function(token) {
       for (var m in topics) {
         if (topics[m]) {
           var j = topics[m].length
           for (var i = 0; i < j; i++) {
             if (topics[m][i].token === token) {
               topics[m].splice(i, 1)
               return token
             }
           }
         }
       }

       return this
     }

})(pubsub)

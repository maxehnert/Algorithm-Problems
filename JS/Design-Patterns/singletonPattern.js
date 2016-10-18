
var mySingleton = (() => {
  var instance

  function init() {
    // singleton

    //private methods and vars
    function privateMethod() {
      console.log('im private')
    }

    var privateVariable = 'im a private variable'
    var privateRandomNum = Math.random()

    return {
      publicMethod() {
        console.log('heyyy im public')
      },

      publicProperty: 'im also public',

      getRandomNumber() {
        return privateRandomNum
      }
    }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = init()
      }

      return instance
    }
  }
})()

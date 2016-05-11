/**
 * Given 2 identical DOM trees and a target Node in tree 1. Find the indentical node in tree 2.
 */

/**
 * Below is the jade markup I used to test this out
 *
 * 
.rootA
  div
    div
    div
      div
      div
      div
    div
    div
      div
      div
        div
      div
      div
    div
    div
    div
      div
      div
        div.target-a Target A
    div
      div
      div
        div
  div
    div
    div
    div
      div
      div
        div
    div        
.rootB
  div
    div
    div
      div
      div
      div
    div
    div
      div
      div
        div
      div
      div
    div
    div
    div
      div
      div
        div.target-a Target B
    div
      div
      div
        div
  div
    div
    div
    div
      div
      div
        div
    div   
 */

/**
 * Here's the algorithm for iterarating over the trees
 */

var rootA = document.querySelector('.rootA');
var rootB = document.querySelector('.rootB')
var targetA = document.querySelectorAll('.target-a')[0];
var targetB = document.querySelectorAll('.target-a')[1];

function getPath(root, target) {
    var current = target;
    var path = [];
    var index;
    while(current !== root) {
      
      // Finds the index of our target in the array of nodes
      index = Array.from(current.parentNode.childNodes).indexOf(current);
      
      // Store the index of our target node position in the beginning of the path array. 
      // Using unshift because we're iterating backwards through the DOM, starting at the bottom and going into higher and higher parent nodes
      path.unshift(index);

      // Set current to the parentNode so the loop starts over on the next higher node list
      current = current.parentNode;
    }
  
  // console.log('path', path);
    return path;
}

// getPath(rootA, targetA);

function findNode(root, target, path) {
  var current = root;
  var i = 0;
  
  while(current !== target) {

    // Iterate down the DOM tree using our path array to guide us.
    current = current.childNodes[path[i]];
    i++;
  }
  
  console.log('current', current);
  return current;
}

findNode(rootB, targetB, getPath(rootA, targetA));

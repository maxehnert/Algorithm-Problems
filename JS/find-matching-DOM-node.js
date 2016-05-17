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

const rootA = document.querySelector('.rootA');
const rootB = document.querySelector('.rootB')
const targetA = document.querySelectorAll('.target-a')[0];
const targetB = document.querySelectorAll('.target-a')[1];

const getPath = (root, target) => {
    let current = target;
    let path = [];
    let index;
  
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

const findNode = (root, target, path) => {
  let current = root;
  let i = 0;
  
  while(current !== target) {
    current = current.childNodes[path[i]];
    i++;
  }
  
  console.log('current', current);
  return current;
}

findNode(rootB, targetB, getPath(rootA, targetA));
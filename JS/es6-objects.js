Object.assign
Object.observe / Object.unobserve
classes, and subclasses
Object.getNotifier
Object.setPrototypeOf()
etc etc
#
# We do a depth-first walk ↴ through our tree, keeping track of the depth as we go.
# When we find a leaf, we throw its depth into a list of depths if we haven't seen that depth already.
#
# Each time we hit a leaf with a new depth, there are two ways that our tree might now be unbalanced:
#
# There are more than 2 different leaf depths
# There are exactly 2 leaf depths and they are more than 1 apart.
# Why are we doing a depth-first walk and not a breadth-first ↴ one? You could make a case for either.
# We chose depth-first because it reaches leaves faster, which allows us to short-circuit earlier in some cases.

# Complexity
# O(n)O(n) time and O(n)O(n) space.
# The depths list never gets bigger than 3 items so it takes O(1)O(1) space, but the nodes stack takes O(n)O(n) space.
#
# Since the number of items in the nodes stack will never be greater than the height of the tree,
# we could say we're taking O(h)O(h) space, where hh is the height of the tree.
# But if our tree is just one straight line (the worst case), h=nh=n.

def is_balanced(tree_root):
    depths = [] # we short-circuit as soon as we find more than 2

    # well treat this array as a stack that will store tuples of (node, depth)
    nodes = []
    nodes.append((tree_root, 0))

    while len(nodes):

        # pop a node and its depth from the top of our stack

        node, depth = nodes.pop()

        # case: we found a leaf
        if (not node.left) and (not node.right):

            # we only care if its a new depth
            if depth not in depths:
                depths.append(depth)

                # two ways we might now have an unbalanced tree:
                #   1) more than 2 different leaf depths
                #   2) 2 leaf depths that are more than 1 apart
                if (len(depths) > 2) or \
                    (len(depths) == 2 and abs(depths[0] - depths[1]) > 1):
                    return False

        # case: this isnt a leaf - keep stepping down
        else:
            if node.left:
                nodes.append((node.left, depth + 1))
            if node.right:
                nodes.append((node.right, depth + 1))

    return True


let is_balanced = (tree_root) => {

  let depths = [];
  let nodes = [];

  nodes.push([tree_root, 0]);

  while (nodes.length) {

    nodes.pop();

    if (!node.left && !node.right) {

      if ()
    }

  }
}

// fucking kill me
for (int i=0, j=0, k=0; k < kmax; ++i,(i%=imax)?0:(++j,(j%=jmax)?0:++k)) {
    //insides
}

var val = (is_odd) ? ((i & 1) ? parseInt(el) * 2 : el) : (!(i & 1) ? parseInt(el) * 2 : el);

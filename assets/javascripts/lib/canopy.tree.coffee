######################################################################
# Canopy Tree Library
######################################################################

root = exports ? this
root.Canopy ||= {}

root.Canopy.tree =
  trim: (tree, level = 1, extend = true) ->
    tree = $.extend({}, tree) if extend
    return tree unless tree.children
    for branch in tree.children
      continue unless branch.children
      if level == 1
        branch.size = @sumSize(branch.children)
        delete branch.children
      else
        @trimTree(branch, level-1)
    tree

  sum: (tree) ->
    # todo: recursively sum up blob nodes in tree
    0



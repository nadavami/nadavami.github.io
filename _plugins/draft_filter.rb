# Restrict draft detection to top-level files in _drafts/ or the main
# file inside a direct subfolder. Prevents nested files (e.g. includes,
# microdemos, assets in subfolders) from being treated as draft posts.
#
# Matches:
#   _drafts/my-post.md
#   _drafts/my-post-folder/my-post.md
#
# Does NOT match:
#   _drafts/my-post-folder/microdemos/demo.html
#   _drafts/my-post-folder/_includes/widget.html
Jekyll::Hooks.register :site, :after_reset do |_site|
  original_verbose = $VERBOSE
  $VERBOSE = nil
  Jekyll::Document.const_set(
    "DATELESS_FILENAME_MATCHER",
    /^(?:[^\/]+\/)?([^\/]*)(\.[^.]+)$/
  )
  $VERBOSE = original_verbose
end

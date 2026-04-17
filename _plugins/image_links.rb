# frozen_string_literal: true

# Wraps standalone post images in links that open full-size in a new tab.
# Only targets <img> tags that are the sole child of a <p> (standard Markdown
# image output) so already-linked images are left alone.

Jekyll::Hooks.register [:posts], :post_render do |doc|
  next unless doc.output_ext == ".html"

  doc.output = doc.output.gsub(%r{<p>\s*<img\s([^>]*?)src="([^"]+)"([^>]*?)/?\s*>\s*</p>}i) do
    attrs = "#{Regexp.last_match(1)}src=\"#{Regexp.last_match(2)}\"#{Regexp.last_match(3)}"
    %(<p><a href="#{Regexp.last_match(2)}" target="_blank" class="post-image"><img #{attrs}></a></p>)
  end
end

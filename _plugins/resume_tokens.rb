# frozen_string_literal: true

# Computes the token count of _data/resume.yml at build time and exposes it
# as site.resume_tokens for use in templates.

require "tiktoken_ruby"

module Jekyll
  Hooks.register :site, :post_read do |site|
    resume_path = File.join(site.source, "_data", "resume.yml")
    if File.exist?(resume_path)
      encoder = Tiktoken.get_encoding("cl100k_base")
      count = encoder.encode(File.read(resume_path)).length
      site.config["resume_tokens"] = if count >= 1000
        format("~%.1fk", count / 1000.0)
      else
        "~#{count}"
      end
    end
  end
end

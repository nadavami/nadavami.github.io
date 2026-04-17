# frozen_string_literal: true

# Publishes _data/resume.yml as /resume.yml in the built site so the structured
# resume data is accessible to robots and other programmatic consumers.

module Jekyll
  class ResumeYaml < StaticFile
    def initialize(site)
      super(site, site.source, "_data", "resume.yml")
    end

    def destination(dest)
      File.join(dest, "resume.yml")
    end
  end

  Hooks.register :site, :post_read do |site|
    site.static_files << ResumeYaml.new(site)
  end
end

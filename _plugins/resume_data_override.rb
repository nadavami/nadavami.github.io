# frozen_string_literal: true

# When RESUME_DATA is set to a YAML file path, replaces site.data["resume"]
# with its contents. Used by the PDF resume pipeline to swap in variant data
# without modifying the working tree.

require "yaml"

Jekyll::Hooks.register :site, :post_read do |site|
  next unless site.config["resume_data_override"]
  alt = ENV["RESUME_DATA"]
  if alt && File.exist?(alt)
    site.data["resume"] = YAML.safe_load(File.read(alt), permitted_classes: [Date])
  end
end

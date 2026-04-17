# frozen_string_literal: true

# Formats JSON Resume iso8601 values (YYYY, YYYY-MM, or YYYY-MM-DD) as display ranges.
#
# Two variants:
#   date_range         — ISO-ish: "2024-10", "2012 – 2016". Used on screen.
#   date_range_formal  — Abbreviated months: "Oct 2024", "2012 – 2016". Used in print and tooltips.
#
# Display precision mirrors input precision. Nil/empty endDate → "Present".

module DateRangeFilter
  MONTHS_ABBR = %w[_ Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec].freeze

  def date_range(start_date, end_date = nil)
    render_range(start_date, end_date, :iso)
  end

  def date_range_formal(start_date, end_date = nil)
    render_range(start_date, end_date, :abbr)
  end

  def date_formal(d)
    format_one(d, :abbr)
  end

  private

  def render_range(start_date, end_date, style)
    s = format_one(start_date, style)
    return "#{s} – Present" if end_date.nil? || end_date.to_s.empty?

    e = format_one(end_date, style)
    s == e ? s : "#{s} – #{e}"
  end

  def format_one(d, style)
    parts = d.to_s.split("-")
    year = parts[0]
    return year if parts.length == 1

    month = parts[1].to_i
    case style
    when :iso  then "#{year}-#{parts[1]}"
    when :abbr then "#{MONTHS_ABBR[month]} #{year}"
    end
  end
end

Liquid::Template.register_filter(DateRangeFilter)

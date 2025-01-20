import re

html_content = ""

with open("/home/julian/schule/wmc/GroupProject/src/overview.html", "r") as f:
    html_content = f.read()

print(html_content)
print("-------------------")
# Regex to match the desired sections
pattern = re.compile(
    r"""
    <h4>(?P<title>.*?)</h4>\s*<p>(?P<description>.*?)</p>\s*<table>.*?\n.*?Github.*?href="(?P<github_link>[^"]+)".*?\n.*?Home page.*?href="(?P<homepage_link>[^"]+)".*?</table>
    """,
    re.DOTALL | re.VERBOSE
)

# Transform matched sections into the desired script tag format
def transform_section(match):
    title = match.group("title")
    description = re.sub(r"\s+", " ", match.group("description").strip())  # Normalize whitespace
    github_link = match.group("github_link")
    homepage_link = match.group("homepage_link")

    return f'''
    <script
        data-component="section-links"
        data-title="{title}"
        data-description="{description}"
        data-link-gh="{github_link}"
        data-link-hp="{homepage_link}"
    ></script>
    '''

# Apply the transformation
transformed_sections = [transform_section(match) for match in pattern.finditer(html_content)]

# Combine transformed sections into the final result
result = "\n".join(transformed_sections)

print(result)

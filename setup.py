import setuptools

with open("README.md", "r", encoding="utf-8") as f:
    long_description = f.read()

__version__ = "0.0.1"

REPONAME = "End-to-end-PCOS-detection-app"
AUTHOR_NAME="ullaslgd"
SRC_REPO ="PCOS-Detection"
AUTHOR_EMAIL="clubullas@gmail.com"

setuptools.setup(
    name=SRC_REPO,
    version=__version__,
    author=AUTHOR_NAME,
    author_email=AUTHOR_EMAIL,
    description="PCOS Detection using machine learning",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=f"https://github.com/{AUTHOR_NAME}/{REPONAME}",
    project_urls={
        "Bug Tracker": f"https://github.com//{AUTHOR_NAME}/{REPONAME}/issues",
    },
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
)


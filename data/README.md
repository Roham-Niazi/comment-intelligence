# Datasets

This directory is used by the data-preparation and model-training notebooks in **Comment Intelligence**.

The dataset files are intentionally not included in this repository because they are large and are hosted by their respective sources. Download them from the original pages below and place the required files in this directory before running the notebooks.

## 1. ParsOffensive Dataset

- **Source:** [golnaz76gh/pars-offensive-dataset](https://github.com/golnaz76gh/pars-offensive-dataset)
- **File used by the project:** `ParsOffensive.xlsx`
- **Format:** Excel (`.xlsx`)
- **Language:** Persian
- **Task:** Offensive-language detection
- **Labels:** `Offensive` and `Neutral`

The dataset repository describes ParsOffensive as a manually labelled collection of 8,433 Persian Instagram comments. See the source repository for the dataset description and details about its collection and annotation.

Download `ParsOffensive.xlsx` from the source repository and place it here:

```text
 data/
 ├── README.md
 └── ParsOffensive.xlsx
```

### Citation

If you use ParsOffensive in research or publish results based on it, cite the associated paper:

> Ali Nazarizadeh, Minoo Sayyadpour, Omid Ebrahimkhani, Amirmasoud Iravani, Golnaz Ghannadan Shirazi, and Mojgan Behravan. “Parsoffensive: Persian Offensive Comments Dataset.” *Proceedings of the 11th International Conference on Web Research (ICWR)*, 2025, pp. 100–104. https://doi.org/10.1109/ICWR65219.2025.11006224

```bibtex
@inproceedings{nazarizadeh2025parsoffensive,
  author    = {Nazarizadeh, Ali and Sayyadpour, Minoo and Ebrahimkhani, Omid and Iravani, Amirmasoud and Ghannadan Shirazi, Golnaz and Behravan, Mojgan},
  title     = {Parsoffensive: Persian Offensive Comments Dataset},
  booktitle = {Proceedings of the 11th International Conference on Web Research (ICWR)},
  year      = {2025},
  pages     = {100--104},
  doi       = {10.1109/ICWR65219.2025.11006224},
  url       = {https://doi.org/10.1109/ICWR65219.2025.11006224}
}
```

## 2. Digikala Comments and Products Dataset

- **Source:** [Digikala (comments & products) on Kaggle](https://www.kaggle.com/datasets/radeai/digikala-comments-and-products)
- **Purpose in this project:** Persian e-commerce comments and recommendation-related labels for experimentation and analysis
- **Data format:** Download the comments file provided by the source; the dataset may also include product information.

The dataset description advertises more than 6 million comments and more than 1.2 million products. The exact files and available columns may change, so check the current Kaggle dataset page before downloading.

The project notebook currently expects the comments CSV at this path:

```text
 data/digikala-comments.csv
```

If the downloaded file has a different name, either rename the comments file to `digikala-comments.csv` or update the corresponding path in the notebook. Keep any product file separate unless a notebook explicitly uses it.

## Download and setup

1. Download the required datasets from their original source pages.
2. Place the files in this `data/` directory using the filenames expected by the notebooks.
3. Check each notebook's input paths before running it. Dataset filenames or schemas may change between releases.
4. Install the project's Python dependencies before running the notebooks.

Dataset files are excluded from Git by the repository's `.gitignore`; only this README is intended to be committed. Do not commit downloaded datasets unless you have verified that their licenses and source terms permit redistribution.

## Licensing and responsible use

The datasets are maintained by third parties. This repository links to their source pages and does not claim ownership of the datasets or grant additional rights to use or redistribute them. Review the current license, terms of use, attribution requirements, and any restrictions on commercial use at each source before using or redistributing the data. The ParsOffensive repository's README provides a citation, but does not clearly state a dataset license; verify the applicable terms with the dataset maintainers if needed.

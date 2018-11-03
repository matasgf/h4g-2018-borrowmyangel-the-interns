'''
Resize all images in a grant
'''
from PIL import Image
import os

def resize(grant_folder):
    for project_folder in os.listdir(grant_folder):
        project_folder = grant_folder + "/" + project_folder
        if project_folder == grant_folder + "/" + ".DS_Store":
            continue
        for image_file in os.listdir(project_folder):
            image_file = project_folder + "/" + image_file
            if image_file == project_folder + "/" + ".DS_Store":
                continue
            else:
                image = Image.open(image_file)
                image.thumbnail((800, 800))
                image.save(image_file)

if __name__ = "__main__":
    grant_folder = "./ET.RST.1H.17.243"
    print("Resizing images...")
    resize(grant_folder)
    print("\n Resizing complete")

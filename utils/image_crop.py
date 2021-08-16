from PIL import Image
import os
from idab.settings import BASE_DIR
from django.template.defaultfilters import slugify
from unidecode import unidecode


def create_crop_3x1_wout_tmb(instance, crop_width=1920, crop_heigth=960):
    main_path = instance.image.path
    relation = crop_width/crop_heigth
    img = Image.open(main_path)
    width, height = img.size
    if width/height < 1:
        crop_width = crop_heigth
        crop_heigth = int(crop_width * relation)
        relation = 1/relation

    if round(height * relation) > width:
        h = round(width / relation)
        left = 0
        top = (height - h) / 2
        right = width
        bottom = top + h
        cropped_img = img.crop((left, top, right, bottom))
    elif round(height * relation) < width:
        w = round(height * relation)
        left = (width - w) / 2
        top = 0
        right = (left + w)
        bottom = height
        cropped_img = img.crop((left, top, right, bottom))
    else:
        cropped_img = img
    
    resized_img = cropped_img.resize((crop_width, crop_heigth))
    resized_img = resized_img.convert('RGB')
    resized_img.save(main_path) 


def create_tmb(instance, tmb_width=300, tmb_heigth=200):
        main_path = instance.image.path
        relation = tmb_width/tmb_heigth
        img = Image.open(main_path)
        width, height = img.size
        if round(height * relation) > width:
            h = round(width / relation)
            left = 0
            top = (height - h) / 2
            right = width
            bottom = top + h
            cropped_img = img.crop((left, top, right, bottom))
        elif round(height * relation) < width:
            w = round(height * relation)
            left = (width - w) / 2
            top = 0
            right = (left + w)
            bottom = height
            cropped_img = img.crop((left, top, right, bottom))
        else:
            cropped_img = img
        
        tmb = cropped_img.resize((tmb_width, tmb_heigth))
        tmb = tmb.convert('RGB')
        path, extension = os.path.splitext(main_path)
        path = path.split('/')
        filename = path.pop()
        path.append('tmb__' + filename)
        tmb_path = '/'.join(path) + extension
        tmb.save(tmb_path)
        tmb_path = tmb_path.replace(str(BASE_DIR), '')
        

def get_tmb_path(instance):
    main_path = instance.image.path
    path, extension = os.path.splitext(main_path)
    path = path.split('/')
    filename = path.pop()
    path.append('tmb__' + filename)
    tmb_path = '/'.join(path) + extension
    tmb_path = tmb_path.replace(str(BASE_DIR), '')
    return tmb_path


def image_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = slugify(unidecode(instance.name))
    if len(folder) > 75:
        folder = folder[:75]
    return '{0}/{1}{2}'.format(folder, slugify(unidecode(name)), '.jpg')


def create_avatar(image, crop_width=200, crop_heigth=200):
    main_path = image.path
    relation = crop_width/crop_heigth
    img = Image.open(main_path)
    width, height = img.size
    if width/height < 1:
        crop_width = crop_heigth
        crop_heigth = int(crop_width * relation)
        relation = 1/relation

    if round(height * relation) > width:
        h = round(width / relation)
        left = 0
        top = (height - h) / 2
        right = width
        bottom = top + h
        cropped_img = img.crop((left, top, right, bottom))
    elif round(height * relation) < width:
        w = round(height * relation)
        left = (width - w) / 2
        top = 0
        right = (left + w)
        bottom = height
        cropped_img = img.crop((left, top, right, bottom))
    else:
        cropped_img = img
    
    resized_img = cropped_img.resize((crop_width, crop_heigth))
    resized_img = resized_img.convert('RGB')
    resized_img.save(main_path) 

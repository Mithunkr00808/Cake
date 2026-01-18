from rembg import remove
from PIL import Image
import os

files = [
    "service-wedding.jpg",
    "service-birthday.jpg",
    "service-occasion.jpg",
    "service-donuts.png"
]

base_path = r"public/assets/images/resource"
output_suffix = "-transparent-v3"

for file in files:
    input_path = os.path.join(base_path, file)
    
    # Correct filename handling
    name, ext = os.path.splitext(file)
    output_filename = f"{name}{output_suffix}.png"
    output_path = os.path.join(base_path, output_filename)
    
    print(f"Processing {input_path} -> {output_path}...")
    
    try:
        input_image = Image.open(input_path)
        
        # Ensure image is in a standard mode for rembg
        if input_image.mode != 'RGBA':
            input_image = input_image.convert('RGBA')
            
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {file}: {e}")

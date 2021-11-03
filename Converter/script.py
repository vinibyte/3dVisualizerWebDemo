import os
import shutil
from time import sleep
inputdirectory = "modelsfbx"
outputdirectory = "modelsgltf"
if(not os.path.exists(outputdirectory)):
    os.mkdir(outputdirectory)

for files in os.listdir("./modelsfbx/"):
    if files.endswith(".fbx"):
        print("Processing: {}".format(files.replace(".fbx","")))
        os.system("FBX-glTF-conv modelsfbx/" + files)
        sleep(0.5)
        print("Done: ./modelsfbx/"+files.replace(".fbx",".fbm"))
        if(os.path.exists("./modelsfbx/" + files.replace(".fbx",".fbm"))):
            shutil.rmtree("./modelsfbx/" + files.replace(".fbx",".fbm"))
        source = "./" + files.replace(".fbx","_glTF")
        destination = "./modelsgltf/"
        os.listdir("./modelsfbx/")
        if(os.path.exists(destination + "/" + source)):
            print("Removed duplicate: " + destination + "/" + source)
            shutil.rmtree(destination + "/" + source)
        shutil.move(source, destination)

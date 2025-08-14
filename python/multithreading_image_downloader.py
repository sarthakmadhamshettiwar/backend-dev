import requests
import threading

import time
def logger(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print("Time taken by {} is {} seconds".format(func.__name__, end_time - start_time))
        return result
    return wrapper

def download_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        print("Image downloaded successfully from {}".format(url))
        id = url.split("/")[-3]
        with open("downloaded_images/"+id+"_image.jpg", "wb") as file:
            file.write(response.content)
    else:
        print("Failed to download image from {}".format(url))

@logger
def sync_download_image(n):
    for id in range(n):
        download_image("https://picsum.photos/id/{}/200/300".format(id+1))

@logger
def multithreaded_download_image(n):
    threads = []
    for id in range(n):
        thread = threading.Thread(target=download_image, args=("https://picsum.photos/id/{}/200/300".format(id+1),))
        threads.append(thread)
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

if __name__ == "__main__":
   # sync_download_image(10) # 30 seconds
   multithreaded_download_image(10) # 10 seconds


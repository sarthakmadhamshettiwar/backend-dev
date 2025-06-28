import asyncio
import aiohttp
import requests
import time

def logger(func):
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        result = await func(*args, **kwargs)
        end_time = time.time()
        print(f"Time taken is {end_time - start_time:.2f} seconds")
        return result
    return wrapper

@logger
def http_request_sync(num_request, limit = 10):
    image_infos = []
    start_time = time.time()
    for id in range(num_request):
        print(f"Id: {id}")
        result = requests.get(url = f"https://picsum.photos/v2/list?page={id+1}&limit={limit}")
        image_infos.append(result.json())
    end_time = time.time()

    print(f"{end_time-start_time}s : SYNC")
    return image_infos
   
@logger
async def fetch_image_info(session, id, limit):
    url = f"https://picsum.photos/v2/list?page={id+1}&limit={limit}"
    async with session.get(url) as response:
        print(f"ID: {id}")
        return await response.json()

async def http_request_async(num_request, limit=10):
    start_time = time.time()
    tasks = []

    async with aiohttp.ClientSession() as session:
        for id in range(num_request):
            task = fetch_image_info(session, id, limit)
            tasks.append(task)

        image_results = await asyncio.gather(*tasks)

    end_time = time.time()
    print(f"Last ID: {num_request - 1} : {image_results[-1]}")
    print(f"{end_time - start_time:.2f}s : ASYNC")
    return image_results

if __name__ == "__main__":
    # http_request_sync(10)
    asyncio.run(http_request_async(10))

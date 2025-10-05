import yt_dlp
import threading

YDL_OPTS = {
    "format": "mp3/bestaudio/best",
    "postprocessors": [
        {
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
        }
    ],
    "outtmpl": "./videos/%(title)s.%(ext)s",
}


def download_video(link, settings):
    with yt_dlp.YoutubeDL(settings) as ydl:
        error_code = ydl.download(link)


def getLinksFromFile():
    try:
        with open(r"./links.txt", "r") as links:
            lines = links.readlines()
    except FileNotFoundError:
        print("missing links.txt in project root")
        exit()
    return lines


# TODO: Angeben wieviele Downloads noch uebrig sind
try:
    urls = getLinksFromFile()
    for link in urls:
        download_video(link, YDL_OPTS)
# TODO: DownloadError von yt_dlp beachten
except IndexError:
    exit

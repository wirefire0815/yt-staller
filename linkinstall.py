import yt_dlp


class YDL:

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

    def get_links_from_file():
        try:
            with open(r"./links.txt", "r") as links:
                lines = links.readlines()
        except FileNotFoundError:
            print("missing links.txt in project root")
            exit()
        return lines

    def download_from_file(self, urls):
        try:
            for link in urls:
                self.download_video(link, self.YDL_OPTS)
        except IndexError:
            exit

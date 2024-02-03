from moviepy.editor import VideoFileClip
import os
import webvtt
import whisper


def extract_audio(video_path, audio_path):
    video = VideoFileClip(video_path)
    audio = video.audio
    audio.write_audiofile(audio_path)

# # Example usage
# video_path = "D:/movie/matrix/matrix2.mp4"
# audio_path = "audio.wav"
# if not os.path.exists(audio_path):
# 	extract_audio(video_path, audio_path)

def read_vtt_captions(input_file):
    vtt = webvtt.read(input_file)
    return [{'start': item.start, 'end':item.end, 'words': [w for w in item.text.split(' ')]} for item in vtt]
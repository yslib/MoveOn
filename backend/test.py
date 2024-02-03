import os

from main import extract_audio, read_vtt_captions

testlist=[
	"matrix2"
]

for testcase in testlist:
	path = os.getcwd() + "\\testcase\\" + testcase + "\\audio.vtt"
	print(path)
	res = read_vtt_captions(path)
	for item in res:
		print(item["words"])
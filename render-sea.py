"""Locked-camera ambient fallback; subtle periodic displacement only below sea horizon."""
from PIL import Image
import numpy as np
import subprocess
from pathlib import Path
source=Image.open('public/media/hero-1600.webp').convert('RGB')
for width,crf,label in [(1280,24,'desktop'),(768,25,'mobile')]:
    height=width*9//16
    original=np.asarray(source.resize((width,height)))
    yy,xx=np.mgrid[0:height,0:width]
    depth=np.clip((yy/height-.56)/.44,0,1)
    # Keep left dune and dry sand locked; displace the sea very gently.
    sea=np.clip((xx/width-.18)/.18,0,1)*depth
    proc=subprocess.Popen(['ffmpeg','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{width}x{height}','-r','24','-i','-','-an','-c:v','libx264','-preset','medium','-crf',str(crf),'-pix_fmt','yuv420p','-movflags','+faststart',f'public/media/hero-{label}.mp4'],stdin=subprocess.PIPE)
    for frame in range(144):
        phase=frame/144*2*np.pi
        offset=sea*(np.sin(yy*.08-phase)*1.6+np.sin(xx*.018+yy*.045+phase)*.55)
        ys=np.clip(yy+offset,0,height-1)
        lo=np.floor(ys).astype(int);hi=np.minimum(lo+1,height-1);weight=(ys-lo)[...,None]
        result=(original[lo,xx]*(1-weight)+original[hi,xx]*weight).astype('uint8')
        proc.stdin.write(result.tobytes())
    proc.stdin.close()
    assert proc.wait()==0
    print(label,Path(f'public/media/hero-{label}.mp4').stat().st_size)

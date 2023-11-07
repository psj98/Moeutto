from fastapi import FastAPI, File, UploadFile
import uvicorn

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained(
    'kakaobrain/kogpt', revision='KoGPT6B-ryan1.5b-float16',  # or float32 version: revision=KoGPT6B-ryan1.5b
    bos_token='[BOS]', eos_token='[EOS]', unk_token='[UNK]', pad_token='[PAD]', mask_token='[MASK]'
)
model = AutoModelForCausalLM.from_pretrained(
    'kakaobrain/kogpt', revision='KoGPT6B-ryan1.5b-float16',  # or float32 version: revision=KoGPT6B-ryan1.5b
    pad_token_id=tokenizer.eos_token_id,
    torch_dtype='auto', low_cpu_mem_usage=True
).to(device='cuda', non_blocking=True)
_ = model.eval()

plain_default = """
{
     "outer": ["검정 경량패딩",70],
     "top": [회색 긴팔티,65],
     "bottom": [회색 면바지,60],
     "item": [검은 안경,0] 
     "temperature": 9  
}
"""


@app.get("/kwon")
async def testdef():
    print("Kwon JinGOO")


@app.post("/comment")
async def create_report(plain_txt: str = plain_default):
    instruction = """
    의사처럼 동작하시오

    [Instructions]
    "입력은 아래의'input_format'을 따릅니다        

    제공된 cloth_name, warmth_score(int), and temperature(int)에 따라서 피드백을 작성하시오. 각 피드백은 공백을 포함하여 30~50 글자 사이여야 합니다. 'item'에 한해서는, 피드백은 보온성에 관계 없이 스타일에 의거하여 작성하시오

	아래의'[return_format]' 에 의거하여 산출물을 작성하시오.
    [input_format]
    '''
    {
         "outer": [cloth_name(str),warmth_score(int)],
         "top": [cloth_name(str),warmth_score(int)],
         "bottom": [cloth_name(str),warmth_score(int)],
         "item": [cloth_name(str),warmth_score(int)],
         "temperature":temperature(int)
    }
    '''
    """
    return_format = """
    [return_format]
    ```
    {
        "outer":feedback(str),
        "top":feedback(str),
        "bottom":feedback(str),
        "item":feedback(str),
    }

    ```
    """

    prompt = instruction + return_format + plain_txt
    with torch.no_grad():
        tokens = tokenizer.encode(prompt, return_tensors='pt').to(device='cuda', non_blocking=True)
        gen_tokens = model.generate(tokens, do_sample=True, temperature=0.9, max_length=512)
        generated = tokenizer.batch_decode(gen_tokens)[0]
    print(generated)
    return generated


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9010)


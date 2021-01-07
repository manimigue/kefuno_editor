# -*- coding: utf-8 -*-

import os
import sys
import json
import shutil
import re
from datetime import date

def compile():
  id = max([log["id"] for log in logs] + [0]) + 1
  url = "news" + str(id) + "_" + config["url"]

  with open(md_path, 'r') as f:
    markdown = f.read()
  
  upload_assets = os.listdir(assets_path) if assets_path else []
  markdown, all_assets = get_sub_assets(markdown)

  md_file = os.path.split(md_path)[1]
  new_md_path = os.path.join(markdowns_path,md_file)
  if os.path.exists(new_md_path):
    new_md_path = os.path.join(markdowns_path,url+".md")
  with open(new_md_path, "w") as f:
    f.write(markdown)
  
  copy_assets = []
  # assetが存在するか，存在しなければ既にアップロードされているかを確認
  for asset in all_assets:
    if not asset in upload_assets:
      copied_assets = [copied for log in logs for copied in log["copied"] if copied]
      if asset in copied_assets:
        copied_origin = next(log["url"] for log in logs if asset in log["copied"])
        print(asset,"は既に",copied_origin,"アップロード時に追加されています")
      else:
        raise FileNotFoundError(asset + "が見つかりませんでした。")
    elif asset in copy_assets:
      pass
    else:
      copy_assets.append(asset)
  
  # 更新先にコピー
  for asset in copy_assets:
    try:
      asset_path = os.path.join(assets_path,asset)
      shutil.copy2(asset_path, os.path.join(markdowns_path,"assets"))
    except FileNotFoundError: #以前のループでチェックしているが，念のため
      raise FileNotFoundError("assetsが見つからないないため，",asset,"がアップロードできません")
    else:
      print("  ",asset)
  else:
    print("以上をアップロードしました")
  
  with open(os.path.join(python_path,"react_imports.txt"),'r') as f:
    import_react = f.read()

  import_react = import_react.replace("NEWARTICLE","../markdown/" + os.path.split(md_path)[1])
  
  import_assets = "\n".join(["import I" + str(i) +" from '../markdown/assets/" + asset + "'" for i, asset in enumerate(copy_assets) ])
  dicts = ",\n".join(["  '" + asset + "' : I" + str(i) for i, asset in enumerate(copy_assets) ])
  
  article_top = "\n".join([import_react,import_assets,"const paths = {",dicts,"}"])

  with open(os.path.join(python_path,"react_component.txt")) as f:
    article_component = f.read()

  article = "\n".join([article_top,'',article_component])
  article_path = os.path.join(articles_path,url + ".jsx")
  with open(article_path,'w') as f:
    f.write(article)

  new_log = {
    "author": config["author"],
    "copied": copy_assets,
    "date": date.today().strftime('%Y-%m-%d'),
    "file": folder,
    "tag": config["tag"],
    "title": config["title"],
    "url": url,
    "id" : id
  }

  logs.append(new_log)
  
  return

def get_sub_assets(markdown):
  asset_regex = re.compile(r"(['\"(])(?:(?:[a-zA-Z]:|(?:\\\\|\/\/)[\w\.]+(?:\\|\/)[\w.$]+|\/[\w.]+)(?:(?:\\|\/)|(?:\\\\|\/\/))(?:[^/\\\n]+(?:\\|\/))*|(?:\.[/\\])*)(assets[/\\])([^/\\\n]+[\.][a-zA-Z]+)(['\")])")
  sub_markdown = asset_regex.sub(r"\1\2\3\4",markdown)
  all_assets = [match[2] for match in asset_regex.findall(markdown)]
  return sub_markdown, all_assets


# def upload(uploads, articles):
#   os.sys

def article_files():
  os.chdir(news_path)

  files = os.listdir()

  expected_files = ["component.jsx", "log.json", "articles", "markdown"]
  for f in expected_files:
    if not f in files:
      raise FileNotFoundError(f + "が見つかりませんでした")
    pass
  
  real_paths = [os.path.realpath(f) for f in expected_files]

  return real_paths


def upload_files(folder):
  os.chdir(upload_path)
  os.chdir(folder)

  files = os.listdir()

  mds = [f for f in files if os.path.splitext(f)[1] == '.md']
  if len(mds) > 1:
    mds = [f for f in files if os.path.splitext(f)[0] == folder]
    if len(mds) > 1: #ありえないが一応
      raise FileNotFoundError("該当するmdファイルが複数見つかりました")
    elif len(mds) < 1:
      raise FileNotFoundError("mdファイルが複数見つかりましたが，該当するファイルが特定できません。")
  elif len(mds) < 1:
    raise FileNotFoundError("mdファイルが見つかりませんでした")
  
  md_path = os.path.abspath(mds[0])

  if not "config.json" in files:
    raise FileNotFoundError("configファイルが見つかりませんでした。")
  config_path = os.path.realpath("config.json")

  assets_path = ""
  if not "assets" in files:
    print("assetsが見つかりませんでした。")
  else:
    assets_path = os.path.abspath("assets")
  
  return md_path, config_path, assets_path
  

if __name__ == "__main__":
  python_path = os.path.dirname(os.path.abspath(__file__))
  # 1: 投稿ファイルの相対パス 2: 更新先となるsrc内のarticlesの相対パス
  # デフォルトで$1=news,$2=src/news
  try:
    upload_path = os.path.abspath(sys.argv[1])
  except IndexError:
    upload_path = os.path.abspath("news")
   
  try:
    news_path = os.path.abspath(sys.argv[2])
  except IndexError:
    news_path = os.path.abspath("src/news")
  
  print("更新先 : ", news_path)
  components_path, logs_path, articles_path, markdowns_path = article_files()
  with open(logs_path,'r') as f:
    logs = json.load(f)

  try:
    os.chdir(upload_path)
  except FileNotFoundError:
    os.mkdir(upload_path)
    os.chdir(upload_path)
  
  folders = [folder for folder in os.listdir() if os.path.isdir(folder)]

  if len(folders) == 0:
    print("アップロードされた記事: ", str(len(folders)), "件")
    exit()
  
  for folder in folders:
    print("更新フォルダ : " , folder)
    md_path, config_path, assets_path = upload_files(folder)
    with open(config_path,'r') as f:
      config = json.load(f)
    compile()
  
  articles = [os.path.splitext(article)[0] for article in os.listdir(articles_path) if os.path.splitext(article)[1] == ".jsx"]
  components_imports = "\n".join(["import " + article + " from './articles/" + article + "'" for article in articles])
  components_exports = ",\n".join(["  { url: '" + article + "', component: " + article + " }" for article in articles])
  components = "\n".join([components_imports, "", "const newsComponents = [", components_exports, "]","export default newsComponents"])

  with open(components_path,'w') as f:
    f.write(components)
  
  with open(logs_path,'w') as f:
    json.dump(logs,f,ensure_ascii=False,indent=2)

  for folder in folders:
    file_path = os.path.join(upload_path, folder)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            pass
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))
  
  
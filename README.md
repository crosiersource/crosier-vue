Para subir a versão no package.json:

* Certifique-se de que alterou a versão no package.json
* `yarn lint`
* `yarn build-lib`
* `git add .`
* `git commit -m "__VERSAO__"`
* `git tag __VERSAO__`
* `git push --tags`
* `npm publish`


    
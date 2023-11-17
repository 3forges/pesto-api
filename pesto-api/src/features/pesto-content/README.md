# `PestoContent` Endpoint

Here I will document usage of that endpoint.

## References

How to upload a file through nestjs rest endpoint:
* https://docs.nestjs.com/techniques/file-upload
* using multer is not compatible with the `FastifyAdapter` which we use, in the Pesto API. That's why we will post the makdown content using base64 encoding.

#### Base64 Encoding / Decoding a string which containers new lines

```bash
jbl@pokus2:~/mongo$ export MARKDWN='# Titre \n paragraphe d introduction \n ## sous titre 1 \n Et voilà'
jbl@pokus2:~/mongo$ echo -e $MARKDWN
# Titre
 paragraphe d introduction
 ## sous titre 1
 Et voilà
jbl@pokus2:~/mongo$ echo -e $MARKDWN | base64
IyBUaXRyZSAKIHBhcmFncmFwaGUgZCBpbnRyb2R1Y3Rpb24gCiAjIyBzb3VzIHRpdHJlIDEgCiBF
dCB2b2lsw6AK
jbl@pokus2:~/mongo$ export MARKDWN_ENCODED='IyBUaXRyZSAKIHBhcmFncmFwaGUgZCBpbnRyb2R1Y3Rpb24gCiAjIyBzb3VzIHRpdHJlIDEgCiBF
dCB2b2lsw6AK'
jbl@pokus2:~/mongo$ export MARKDWN_ENCODED='IyBUaXRyZSAKIHBhcmFncmFwaGUgZCBpbnRyb2R1Y3Rpb24gCiAjIyBzb3VzIHRpdHJlIDEgCiBFdCB2b2lsw6AK'
jbl@pokus2:~/mongo$ export MARKDWN_ENCODED='IyBUaXRyZSAKIHBhcmFncmFwaGUgZCBpbnRyb2R1Y3Rpb24gCiAjIyBzb3VzIHRpdHJlIDEgCiBFdCB2b2lsw6AK'
jbl@pokus2:~/mongo$ echo $MARKDWN_ENCODED | base64 -d
# Titre
 paragraphe d introduction
 ## sous titre 1
 Et voilà
jbl@pokus2:~/mongo$

```

In javascript, we have a native function in the browser:

```JavaScript
let truc = btoa(`salut`); console.log(truc);
```

Now we would like to rely on a non-browser npm package,such as :

* https://www.npmjs.com/package/base-64 (millions of downloads every week)

```bash
pnpm add --save base-64 && pnpm add -D @types/base-64
```

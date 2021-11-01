import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const productsDirectory = path.join(process.cwd(), 'products')

export function getSortedProductsData() {
  const fileNames = fs.readdirSync(productsDirectory)
  const allProductsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(productsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  // Sort products by date
  return allProductsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  }).filter(post => !post.hide);
}

export function getAllProductIds() {
    const fileNames = fs.readdirSync(productsDirectory)

    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  export async function getProductData(id) {
    const fullPath = path.join(productsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();
  
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }
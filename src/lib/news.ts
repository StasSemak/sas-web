import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

const getMDXFiles = async (dir: string) => {
    return (await fs.readdir(dir)).filter((file) => path.extname(file) === ".mdx");
}

const readMDXFile = async (filePath: string) => {
    const rawContent = await fs.readFile(filePath, "utf-8");
    return matter(rawContent)
}

const getMDXData = async (dir: string) => {
    const mdxFiles = await getMDXFiles(dir);
    return mdxFiles.map(async (file) => {
        const { data, content } = await readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file))

        return {
            data,
            slug,
            content,
        }
    })
}

export const getNewsPosts = async (count?: number) => {
    const posts = await getMDXData(path.join(process.cwd(), "src", "content", "news"))

    if(!count || count > posts.length) return posts;

    return posts.slice(0, count);
}
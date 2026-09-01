type ProfilePageProps = {
    params: Promise<{
        id: string
    }>
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
    const { id } = await params

    return <div>Profile: {id}</div>
}

export default ProfilePage
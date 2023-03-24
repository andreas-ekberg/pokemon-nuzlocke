interface teamMemberProp {
    name: string
};

export default function TeamMember({ name }: teamMemberProp) {
    return (
        <h3>{name}</h3>
    )
}